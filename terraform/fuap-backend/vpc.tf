# Creación de la VPC
resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr

  tags = {
    Name = "fuap-dev-vpc"
  }

  enable_dns_support   = true
  enable_dns_hostnames = true
}

# Definición de variables para los rangos de CIDR de las subredes
variable "public_subnet_cidr_a" {
  default = "10.0.1.0/24"
}

variable "public_subnet_cidr_b" {
  default = "10.0.2.0/24"
}

variable "private_subnet_cidr_a" {
  default = "10.0.3.0/24"
}

variable "private_subnet_cidr_b" {
  default = "10.0.4.0/24"
}

# Subred pública en AZ A
resource "aws_subnet" "public_a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.public_subnet_cidr_a
  availability_zone = "${var.aws_region}a"

  tags = {
    Name = "public-subnet-a"
  }
}

# Subred pública en AZ B
resource "aws_subnet" "public_b" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.public_subnet_cidr_b
  availability_zone = "${var.aws_region}b"

  tags = {
    Name = "public-subnet-b"
  }
}

# Subred privada en AZ A
resource "aws_subnet" "private_a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnet_cidr_a
  availability_zone = "${var.aws_region}a"

  tags = {
    Name = "private-subnet-a"
  }
}

# Subred privada en AZ B
resource "aws_subnet" "private_b" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnet_cidr_b
  availability_zone = "${var.aws_region}b"

  tags = {
    Name = "private-subnet-b"
  }
}

# Internet Gateway para la VPC
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "fuap-dev-igw"
  }
}

# Tabla de ruteo pública
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "public-route-table"
  }
}

# Asociación de tabla de ruteo pública con subred pública en AZ A
resource "aws_route_table_association" "public_a" {
  subnet_id      = aws_subnet.public_a.id
  route_table_id = aws_route_table.public.id
}

# Asociación de tabla de ruteo pública con subred pública en AZ B
resource "aws_route_table_association" "public_b" {
  subnet_id      = aws_subnet.public_b.id
  route_table_id = aws_route_table.public.id
}

# Elastic IP para NAT Gateway en AZ A
resource "aws_eip" "nat_a" {
  tags = {
    Name = "fuap-dev-nat-eip-a"
  }
}

# Elastic IP para NAT Gateway en AZ B
resource "aws_eip" "nat_b" {
  tags = {
    Name = "fuap-dev-nat-eip-b"
  }
}

# NAT Gateway en subred pública en AZ A
resource "aws_nat_gateway" "nat_a" {
  allocation_id = aws_eip.nat_a.id
  subnet_id     = aws_subnet.public_a.id

  tags = {
    Name = "fuap-dev-nat-a"
  }
}

# NAT Gateway en subred pública en AZ B
resource "aws_nat_gateway" "nat_b" {
  allocation_id = aws_eip.nat_b.id
  subnet_id     = aws_subnet.public_b.id

  tags = {
    Name = "fuap-dev-nat-b"
  }
}

# Tabla de ruteo privada para subred privada en AZ A
resource "aws_route_table" "private_a" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_a.id
  }

  tags = {
    Name = "private-route-table-a"
  }
}

# Tabla de ruteo privada para subred privada en AZ B
resource "aws_route_table" "private_b" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_b.id
  }

  tags = {
    Name = "private-route-table-b"
  }
}

# Asociación de tabla de ruteo privada con subred privada en AZ A
resource "aws_route_table_association" "private_a" {
  subnet_id      = aws_subnet.private_a.id
  route_table_id = aws_route_table.private_a.id
}

# Asociación de tabla de ruteo privada con subred privada en AZ B
resource "aws_route_table_association" "private_b" {
  subnet_id      = aws_subnet.private_b.id
  route_table_id = aws_route_table.private_b.id
}
