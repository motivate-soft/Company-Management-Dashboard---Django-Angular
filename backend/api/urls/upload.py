from django.urls import path, include, re_path
from api.endpoint import upload

urlpatterns = [
    re_path(r'avatar', upload.UploadImage.as_view()),
]

