# Load Balancer (ALB)
resource "aws_lb" "main" {
  name               = "fuap-app-dev-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [
    aws_security_group.lb.id,
  ]

  subnet_mapping {
    subnet_id     = aws_subnet.public_a.id  # Reemplaza con el ID de la subred pública donde se ubicará el ALB
  }

  subnet_mapping {
    subnet_id = aws_subnet.public_b.id  # Subred en AZ B
  }

  tags = {
    Name = "fuap-app-dev-alb"
  }
}

# Target Group
resource "aws_lb_target_group" "main" {
  name        = "fuap-app-dev-target-group"
  port        = 3000  # Puerto donde escucha tu aplicación (por ejemplo, NestJS)
  protocol    = "HTTP"
  target_type = "ip"

  vpc_id = aws_vpc.main.id  # Reemplaza con el ID de tu VPC

  health_check {
    path                = "/api/docs"
    protocol            = "HTTP"
    timeout             = 5
    interval            = 30
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }

  tags = {
    Name = "fuap-app-dev-target-group"
  }
}

# Listener
resource "aws_lb_listener" "main" {
  load_balancer_arn = aws_lb.main.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.main.arn
  }
}
