# Despliegue de Aplicación NestJS en AWS con GitHub Actions

Este proyecto proporciona una guía paso a paso para desplegar una aplicación de NestJS en AWS utilizando GitHub Actions, Amazon Elastic Container Registry (ECR), Amazon Elastic Container Service (ECS) y una base de datos PostgreSQL.

## Servicios de AWS Utilizados

1. **Amazon Elastic Container Registry (ECR)**: Un servicio de registro de contenedores totalmente administrado para almacenar, administrar y desplegar imágenes de contenedores Docker.
2. **Amazon Elastic Container Service (ECS)**: Un servicio altamente escalable y de alto rendimiento para ejecutar contenedores Docker.
3. **Amazon Relational Database Service (RDS) con PostgreSQL**: Un servicio de base de datos relacional que facilita la configuración, operación y escalabilidad de PostgreSQL en la nube.
4. **AWS Identity and Access Management (IAM)**: Un servicio que ayuda a controlar el acceso a los servicios y recursos de AWS de forma segura.
5. **Amazon Virtual Private Cloud (VPC)**: Un servicio que te permite lanzar recursos de AWS en una red virtual que has definido.

## Prerrequisitos

- Cuenta de AWS.
- Docker instalado.
- AWS CLI instalada y configurada.
- GitHub repository configurado.

## Configuración de AWS

### 1. Crear un Repositorio de ECR

1. Ve a la consola de administración de AWS.
2. Navega a **ECR (Elastic Container Registry)**.
3. Haz clic en "Create repository".
4. Configura las siguientes opciones:
   - **Visibility settings**: Selecciona "Private".
   - **Repository name**: Introduce un nombre para tu repositorio, por ejemplo, `nestjs-app`.
   - Deja las demás opciones por defecto y haz clic en "Create repository".
5. Toma nota del URI del repositorio (algo como `123456789012.dkr.ecr.us-west-2.amazonaws.com/nestjs-app`).

### 2. Configurar la Base de Datos PostgreSQL en Amazon RDS

1. Ve a la consola de administración de AWS.
2. Navega a **RDS (Relational Database Service)**.
3. Haz clic en "Create database".
4. Selecciona "Standard Create".
5. Configura las siguientes opciones:
   - **Engine options**: Selecciona "PostgreSQL".
   - **Version**: Selecciona la versión de PostgreSQL que desees utilizar.
   - **Templates**: Selecciona "Free tier" si estás en el nivel gratuito, o "Production" para un entorno de producción.
6. En **Settings**:
   - **DB instance identifier**: Introduce un nombre para tu instancia, por ejemplo, `nestjs-db`.
   - **Master username**: Introduce un nombre de usuario, por ejemplo, `admin`.
   - **Master password**: Introduce una contraseña y confírmala.
7. En **Instance configuration**:
   - **DB instance class**: Selecciona una clase de instancia adecuada para tus necesidades, como `db.t2.micro`.
8. En **Storage**:
   - Ajusta el almacenamiento según tus necesidades, dejando las opciones por defecto si no estás seguro.
9. En **Connectivity**:
   - **Virtual Private Cloud (VPC)**: Selecciona el VPC en el que deseas desplegar la base de datos.
   - **Subnet group**: Selecciona un grupo de subredes.
   - **Public access**: Selecciona "Yes" si deseas que la base de datos sea accesible públicamente, o "No" para restringir el acceso.
10. En **Additional configuration**:
    - Configura las opciones adicionales según tus necesidades, como parámetros de base de datos, backup, y monitoreo.
11. Haz clic en "Create database".

### 3. Configurar el VPC y los Grupos de Seguridad

#### 3.1 Crear un VPC

1. Ve a la consola de administración de AWS.
2. Navega a **VPC**.
3. Haz clic en "Create VPC".
4. Configura las siguientes opciones:
   - **Name tag**: Introduce un nombre para tu VPC, por ejemplo, `nestjs-vpc`.
   - **IPv4 CIDR block**: Introduce un rango de CIDR, por ejemplo, `10.0.0.0/16`.
   - Deja las demás opciones por defecto y haz clic en "Create VPC".

#### 3.2 Crear Subnets

1. Dentro del VPC, crea subnets públicas y privadas.
2. Haz clic en "Subnets" y luego en "Create subnet".
3. Configura las siguientes opciones:
   - **Name tag**: Introduce un nombre para la subnet pública, por ejemplo, `public-subnet-1`.
   - **VPC**: Selecciona el VPC que creaste anteriormente (`nestjs-vpc`).
   - **Availability Zone**: Selecciona una zona de disponibilidad.
   - **IPv4 CIDR block**: Introduce un rango de CIDR, por ejemplo, `10.0.1.0/24`.
4. Repite el proceso para la subnet privada:
   - **Name tag**: Introduce un nombre para la subnet privada, por ejemplo, `private-subnet-1`.
   - **VPC**: Selecciona el VPC que creaste anteriormente (`nestjs-vpc`).
   - **Availability Zone**: Selecciona una zona de disponibilidad.
   - **IPv4 CIDR block**: Introduce un rango de CIDR, por ejemplo, `10.0.2.0/24`.

#### 3.3 Crear y Configurar Grupos de Seguridad

1. **Grupo de Seguridad para ECS**:
   - Navega a **Security Groups** y haz clic en "Create security group".
   - **Security group name**: Introduce un nombre para el grupo de seguridad, por ejemplo, `ecs-sg`.
   - **Description**: Introduce una descripción.
   - **VPC**: Selecciona el VPC que creaste (`nestjs-vpc`).
   - En **Inbound rules**, añade reglas para permitir tráfico HTTP/HTTPS y el puerto de tu aplicación (por ejemplo, 3000):
     - **Type**: HTTP, **Protocol**: TCP, **Port range**: 80, **Source**: 0.0.0.0/0
     - **Type**: HTTPS, **Protocol**: TCP, **Port range**: 443, **Source**: 0.0.0.0/0
     - **Type**: Custom TCP, **Protocol**: TCP, **Port range**: 3000, **Source**: 0.0.0.0/0
   - Haz clic en "Create security group".

2. **Grupo de Seguridad para RDS**:
   - Navega a **Security Groups** y haz clic en "Create security group".
   - **Security group name**: Introduce un nombre para el grupo de seguridad, por ejemplo, `rds-sg`.
   - **Description**: Introduce una descripción.
   - **VPC**: Selecciona el VPC que creaste (`nestjs-vpc`).
   - En **Inbound rules**, añade una regla para permitir tráfico en el puerto 5432 desde el grupo de seguridad de ECS:
     - **Type**: Custom TCP, **Protocol**: TCP, **Port range**: 5432, **Source**: Selecciona el grupo de seguridad `ecs-sg`.
   - Haz clic en "Create security group".

### 4. Crear un Clúster de ECS

1. Ve a la consola de administración de AWS.
2. Navega a **ECS (Elastic Container Service)**.
3. Haz clic en "Create Cluster".
4. Selecciona "Networking only (Fargate)" para utilizar Fargate, o "EC2 Linux + Networking" si prefieres EC2.
5. Configura las siguientes opciones:
   - **Cluster name**: Introduce un nombre para tu clúster, por ejemplo, `nestjs-cluster`.
   - Deja las demás opciones por defecto y haz clic en "Create".

## Configuración de GitHub Actions

### 1. Crear el Archivo de Workflow

Crea un archivo `.github/workflows/ci-cd.yml` en tu repositorio de GitHub:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main

jobs:
  build-and-push-to-ecr:
    name: Build and Push Docker image to Amazon ECR
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v1

      - name: Log in to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1
        with:
          region: ${{ secrets.AWS_REGION }}
          access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}

      - name: Build, tag, and push Docker image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          ECR_REPOSITORY: ${{ secrets.ECR_REPOSITORY }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG

  deploy-to-ecs:
    name: Deploy to Amazon ECS
    runs-on: ubuntu-latest
    needs: build-and-push-to-ecr

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Update ECS service
        env:
          AWS_REGION: ${{ secrets.AWS_REGION }}
          ECS_CLUSTER: ${{ secrets.ECS_CLUSTER }}
          ECS_SERVICE: ${{ secrets.ECS_SERVICE }}
          ECR_REPOSITORY: ${{ secrets.ECR_REPOSITORY }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          aws ecs update-service --cluster $ECS_CLUSTER --service $ECS_SERVICE --force-new-deployment --region $AWS_REGION --desired-count 1
