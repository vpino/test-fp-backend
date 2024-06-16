resource "aws_iam_role" "ecs_task_execution_role" {
  name               = "ecsTaskExecutionRoleV2"  # Cambia el nombre aquí
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect    = "Allow",
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        },
        Action    = "sts:AssumeRole"
      }
    ]
  })

  tags = {
    Name = "ecs-task-execution-role"
  }

  lifecycle {
    ignore_changes = [
      assume_role_policy,
    ]
  }
}
