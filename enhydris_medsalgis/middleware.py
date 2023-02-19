from django.conf import settings
from django.utils import translation


class MedsalGISMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Right now we always use lang="". But should we decide to i18n/l10n the system
        # so that the mapserver popups use different languages, this is the code that
        # should be used instead (but instead of "el" maybe another language or list of
        # languages should be used):
        #     lang = translation.get_language()
        #     if lang != "el":
        #         lang = ""
        lang = ""

        request.medsalgis = {
            "ows_url": f"{settings.ENHYDRIS_OWS_URL}{lang}/medsalgis.map"
        }
        response = self.get_response(request)
        return response
