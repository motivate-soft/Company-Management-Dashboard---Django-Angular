"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path, include

urlpatterns = [
    path('customer', include('api.urls.customer')),             # customer api
    path('product', include('api.urls.product')),               # product api
    path('upload', include('api.urls.upload')),                 # upload api
    path('company', include('api.urls.company')),               # upload api
    path('email', include('api.urls.email')),                   # upload api
    path('order', include('api.urls.order')),                   # order api
    path('history', include('api.urls.history')),               # history api
    path('test', include('api.urls.test')),                     # test api

]

