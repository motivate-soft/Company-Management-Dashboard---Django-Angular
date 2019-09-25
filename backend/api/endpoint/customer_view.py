from rest_framework import generics
from api.models import Customer
from rest_framework.response import Response
from api.serializers import CustomerSerializer
from authentication.serializers import UserSerializer
from authentication.models import User
from rest_framework.views import APIView
from django.db.models import Q
import json
from socketio_app.views import sio


class CustomerView(generics.ListCreateAPIView):
    """
    Api for create and list customers
    """
    serializer_class = CustomerSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Customer.objects.filter(owner=user.id)
        return queryset

    def post(self, request, *args, **kwargs):
        user = self.request.user
        first_name = self.request.data['first_name']
        last_name = self.request.data['last_name']
        email = self.request.data['email']
        company = self.request.data['company']
        phone = self.request.data['phone']
        address = self.request.data['address']
        apartment = self.request.data['apartment']
        city = self.request.data['city']
        country = self.request.data['country']
        region = self.request.data['region']
        postal_code = self.request.data['postal_code']
        image = self.request.data['image']

        customer = Customer.objects.create(
            owner=user,
            first_name=first_name,
            last_name=last_name,
            email=email,
            company=company,
            phone=phone,
            address=address,
            apartment=apartment,
            city=city,
            country=country,
            region=region,
            postal_code=postal_code,
            image=image)
        customer_serializer = CustomerSerializer(customer)
        sio.emit('create_change_customer', {
            'data': {
                'state': 'created',
                'customer': customer_serializer.data,
                'user': {
                    'email': user.email,
                    'id': user.id
                }
            }
        }, namespace='/test')
        return Response(customer_serializer.data)


class CustomerUpdateView(generics.UpdateAPIView):
    """
    Api for updating customer
    """

    serializer_class = CustomerSerializer

    def get_queryset(self):
        customer_id = self.kwargs['pk']

    def update(self, request, *args, **kwargs):
        customer_id = self.kwargs['pk']
        user = self.request.user
        first_name = self.request.data['first_name']
        last_name = self.request.data['last_name']
        email = self.request.data['email']
        company = self.request.data['company']
        phone = self.request.data['phone']
        address = self.request.data['address']
        apartment = self.request.data['apartment']
        city = self.request.data['city']
        country = self.request.data['country']
        region = self.request.data['region']
        postal_code = self.request.data['postal_code']
        image = self.request.data['image']

        customer = Customer.objects.filter(pk=customer_id).first()

        if first_name:
            customer.first_name = first_name
        if last_name:
            customer.last_name = last_name
        if email:
            customer.email = email
        if company:
            customer.company = company
        if phone:
            customer.phone = phone
        if address:
            customer.address = address
        if apartment:
            customer.apartment = apartment
        if city:
            customer.city = city
        if country:
            customer.country = country
        if region:
            customer.region = region
        if postal_code:
            customer.postal_code = postal_code
        if image:
            customer.image = image

        customer.save()
        customer_serializer = CustomerSerializer(customer)

        sio.emit('create_change_customer', {
            'data': {
                'state': 'updated',
                'customer': customer_serializer.data,
                'user': {
                    'email': user.email,
                    'id': user.id
                }
            }
        }, namespace='/test')
        return Response(customer_serializer.data)


class CustomerDeleteView(generics.DestroyAPIView):
    """
    Api for deleting customer
    """

    serializer_class = CustomerSerializer

    def get_queryset(self):
        customer_id = self.kwargs['pk']
        user = self.request.user
        queryset = Customer.objects.filter(pk=customer_id)
        customer = Customer.objects.filter(pk=customer_id).first()
        customer_serializer = CustomerSerializer(customer)
        sio.emit('create_change_customer', {
            'data': {
                'state': 'deleted',
                'customer': customer_serializer.data,
                'user': {
                    'email': user.email,
                    'id': user.id
                }
            }
        }, namespace='/test')
        return queryset


class SearchCustomerView(APIView):
    """
    search user by username or email

    """
    def get(self, request, *args, **kwargs):
        user_id = self.request.user.id
        filter = request.query_params['filter']
        filter_json = json.loads(filter)
        customers = User.objects.filter(Q(email__icontains=filter_json['arg'])).exclude(id=user_id).all()
        customers_serializer = UserSerializer(customers, many=True)
        return Response(customers_serializer.data)
