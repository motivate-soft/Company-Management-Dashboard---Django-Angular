from rest_framework import generics
from api.models import Order
from api.serializers import OrderSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from socketio_app.views import sio


class OrderView(generics.ListCreateAPIView):
    """
    Api for updating customer
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Order.objects.filter(owner=user.id)
        return queryset

    def create(self, request, *args, **kwargs):
        user = self.request.user
        products = self.request.data['products']
        amounts = self.request.data['amounts']
        customer_id = self.request.data['customer']
        owner = self.request.data['owner']
        total_price = self.request.data['total_price']
        total_tax = self.request.data['total_tax']

        order = Order.objects.create(
            owner=owner,
            products=products,
            amounts=amounts,
            customer_id=customer_id,
            total_price=total_price,
            total_tax=total_tax
        )

        order_serializer = OrderSerializer(order)
        sio.emit('create_change_order', {
            'data': {
                'state': 'created',
                'order': order_serializer.data,
                'user': {
                    'email': user.email,
                    'id': user.id
                }
            }
        }, namespace='/test')
        return Response(order_serializer.data)


class GetOrder(generics.ListCreateAPIView):
    """
    Api for updating customer
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        user = self.request.user
        order_id = self.kwargs['order_id']
        queryset = Order.objects.filter(id=order_id, owner=user.id)
        return queryset


class GetAmount(APIView):
    """
    uploading avatars to statics/images

    """

    def get(self, request, *args, **kwargs):
        user = self.request.user
        amount = Order.objects.filter(owner=user.id).count()
        return Response(amount)


class OrderUpdateView(generics.UpdateAPIView):
    """
    Api for updating customer
    """

    serializer_class = OrderSerializer

    def update(self, request, *args, **kwargs):
        order_id = self.kwargs['pk']
        user = self.request.user
        products = self.request.data['products']
        amounts = self.request.data['amounts']
        customer_id = self.request.data['customer']
        owner = self.request.data['owner']
        total_price = self.request.data['total_price']
        total_tax = self.request.data['total_tax']

        order = Order.objects.filter(pk=order_id).first()

        if products:
            order.products = products
        if amounts:
            order.amounts = amounts
        if customer_id:
            order.customer_id = customer_id
        if total_price:
            order.total_price = total_price
        if total_tax:
            order.total_tax = total_tax

        order.save()
        order_serializer = OrderSerializer(order)

        sio.emit('create_change_order', {
            'data': {
                'state': 'updated',
                'order': order_serializer.data,
                'user': {
                    'email': user.email,
                    'id': user.id
                }
            }
        }, namespace='/test')
        return Response(order_serializer.data)


class OrderDeleteView(generics.DestroyAPIView):
    """
    Api for deleting customer
    """

    serializer_class = OrderSerializer

    def get_queryset(self):
        order_id = self.kwargs['pk']
        user = self.request.user
        queryset = Order.objects.filter(pk=order_id)
        order = Order.objects.filter(pk=order_id).first()
        order_serializer = OrderSerializer(order)
        sio.emit('create_change_order', {
            'data': {
                'state': 'deleted',
                'order': order_serializer.data,
                'user': {
                    'email': user.email,
                    'id': user.id
                }
            }
        }, namespace='/test')
        return queryset
