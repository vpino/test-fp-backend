resource "aws_ecr_repository" "fuap_dev_app" {
  name = var.ecr_repository_name
  image_scanning_configuration {
    scan_on_push = true
  }
  tags = {
    Name = "fuap-dev-app"
  }
}
