variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-2"
}

variable "vpc_cidr" {
  description = "Fuap CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  description = "Fuap CIDR block for the public subnet"
  type        = string
  default     = "10.0.1.0/24"
}

variable "private_subnet_cidr" {
  description = "Fuap CIDR block for the private subnet"
  type        = string
  default     = "10.0.2.0/24"
}

variable "db_instance_class" {
  description = "Database instance class"
  type        = string
  default     = "db.t3.micro"
}

variable "db_identifier" {
  description = "Database development"
  type        = string
  default     = "fuap"
}

variable "db_name" {
  description = "Database development"
  type        = string
  default     = "fuap_dev"
}

variable "db_engine" {
  description = "Database engine"
  type        = string
  default     = "postgres"
}

variable "db_username" {
  description = "User developer"
  type        = string
  default     = "fuap"
}

variable "db_password" {
  description = "fuap_dev"
  type        = string
  default     = "fuap_dev"
}

variable "ecr_repository_name" {
  description = "ECR repository name"
  type        = string
  default     = "fuap-dev-app"
}

variable "cluster_name" {
  description = "ECS cluster name"
  type        = string
  default     = "fuap-dev-cluster"
}

variable "service_name" {
  description = "ECS service name"
  type        = string
  default     = "fuap-dev-service"
}

variable "cloudfront_origin_id" {
  description = "CloudFront origin ID"
  type        = string
  default     = "fuap-dev-origin"
}

variable "cloudfront_price_class" {
  description = "CloudFront price class"
  type        = string
  default     = "PriceClass_100"
}

variable "family_name" {
  description = "Family name"
  type        = string
  default     = "fuap-dev-task"
}