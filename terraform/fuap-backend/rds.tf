resource "aws_db_subnet_group" "default" {
  name       = "fuap-dev-db-subnet-group"
  subnet_ids = [
    aws_subnet.public_a.id,
    aws_subnet.public_b.id,
    aws_subnet.private_b.id,
    aws_subnet.private_a.id
  ]
  tags = {
    Name = "fuap-dev-db-subnet-group"
  }
}

resource "aws_db_instance" "default" {
  identifier              = var.db_identifier
  db_name                 = var.db_name
  engine                  = var.db_engine
  instance_class          = var.db_instance_class
  username                = var.db_username
  password                = var.db_password
  allocated_storage       = 20
  max_allocated_storage   = 100
  db_subnet_group_name    = aws_db_subnet_group.default.name
  vpc_security_group_ids  = [aws_security_group.rds.id]
  publicly_accessible     = true
  skip_final_snapshot     = true

  tags = {
    Name = "fuap-dev-db"
  }
}
