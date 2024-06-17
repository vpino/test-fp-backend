output "vpc_id" {
  value = aws_vpc.main.id
}

output "public_subnet_a_id" {
  value = aws_subnet.public_a.id
}

output "public_subnet_b_id" {
  value = aws_subnet.public_b.id
}

output "private_subnet_id" {
  value = aws_subnet.private_a.id
}
output "private_subnet_b_id" {
  value = aws_subnet.private_b.id
}

output "db_instance_endpoint" {
  value = aws_db_instance.default.endpoint
}

output "ecr_repository_url" {
  value = aws_ecr_repository.fuap_dev_app.repository_url
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.main.name
}

output "ecs_service_name" {
  value = aws_ecs_service.main.name
}

# output "cloudfront_distribution_id" {
#   value = aws_cloudfront_distribution.main.id
# }

# output "cloudfront_distribution_domain" {
#   value = aws_cloudfront_distribution.main.domain_name
# }
