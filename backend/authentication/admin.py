from django.contrib import admin
from authentication.models import User


class UserAdmin(admin.ModelAdmin):
    model = User
    list_display = ['id', 'email', 'first_name', 'last_name', 'username', 'phone', 'country', 'city', 'address', 'last_login', 'is_active']


admin.site.register(User, UserAdmin)

