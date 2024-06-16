resource "aws_ecs_cluster" "main" {
  name = var.cluster_name
  tags = {
    Name = "fuap-dev-cluster"
  }
}

resource "aws_ecs_task_definition" "main" {
  family                   = "fuap-dev-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([
    {
      name      = "fuap-dev"
      image     = "${aws_ecr_repository.fuap_dev_app.repository_url}:latest"
      essential = true
      portMappings = [
        {
          containerPort = 3000
          hostPort      = 3000
        }
      ]
      environment = [
        {
          name  = "DATABASE_HOST"
          value = aws_db_instance.default.endpoint
        },
        {
          name  = "DATABASE_PORT"
          value = "5432"
        },
        {
          name  = "DATABASE_USER"
          value = var.db_username
        },
        {
          name  = "DATABASE_PASSWORD"
          value = var.db_password
        },
        {
          name  = "DATABASE_NAME"
          value = var.db_name
        }
      ]
    }
  ])
  tags = {
    Name = "fuap-dev-task"
  }
}

resource "aws_ecs_service" "main" {
  name            = var.service_name
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.main.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = [
      aws_subnet.public_a.id,
      aws_subnet.public_b.id,
      aws_subnet.private_a.id,
      aws_subnet.private_b.id
    ]
    security_groups = [aws_security_group.ecs.id]
  }

  tags = {
    Name = "fuap-dev-service"
  }
}
