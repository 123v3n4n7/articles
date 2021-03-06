from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response

from knox.models import AuthToken

from .models import Article
from .serializers import ArticleSerializer, CreateUserSerializer, UserSerializer, LoginUserSerializer

class ArticleViewSet(viewsets.ModelViewSet):
    # queryset = Article.objects.all()
    # permission_classes = [permissions.AllowAny, ]
    # serializer_class = ArticleSerializer
    permission_classes = [permissions.AllowAny,]
    serializer_class = ArticleSerializer

    def get_queryset(self):
        return self.request.user.articles.all()
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })

class UserAPI(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user