module "fuap_app_develop" {
  source = "./fuap-backend"
  db_password = "fuap_dev"
}

# output "fuap_app_dev_ip" {
#   description = "Ip Address public from instance EC2"
#   value = module.fuap_app_develop.server_public_ip
# }

# output "fuap_app_dev_dns" {
#   description = "Dns public from instance EC2"
#   value = module.fuap_app_develop.server_public_dns
# }