from . import views
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register("items", views.ItemViewSet, "items")

urlpatterns = router.urls
