from django.conf import settings
import datetime
import os
from PIL import Image
import io as BytesIOModule

def convert_to_thumbnail_image(file, filename):
    '''
    :param filename:
    :param file:
    convert image which is bigger than 200kb to 900 * 900 thumbnail
    :return: byte data
    '''
    image = Image.open(file)
    image.thumbnail((900, 900))
    thumb_buffer = BytesIOModule.BytesIO()
    image.save(thumb_buffer, format=image.format)
    fp = open(filename, "wb")
    fp.write(thumb_buffer.getvalue())
    fp.close()
    fp = open(filename, "rb")
    os.remove(filename)
    return fp


def _safe_filename(filename):
    """
    Generates a safe filename that is unlikely to collide with existing objects
    in AWS S3 bucket.
    ``filename.ext`` is transformed into ``filename-YYYY-MM-DD-HHMMSS.ext``
    """
    filename = filename.replace(" ", "_").lower()
    date = datetime.datetime.utcnow().strftime("%Y-%m-%d-%H%M%S")
    basename, extension = filename.rsplit('.', 1)
    return "{0}-{1}.{2}".format(basename, date, extension)


def uploadImage(filename, file, type):
    image = Image.open(file)
    image.thumbnail((50, 50))
    thumb_buffer = BytesIOModule.BytesIO()
    image.save(thumb_buffer, format=image.format)
    filename = 'statics/image/' + filename
    fp = open(filename, "wb")
    fp.write(thumb_buffer.getvalue())
    fp.close()

    return filename


def get_filename_from_url(url):
    """
    get file name from ulr
    :param url: https://s3-us-west-1.amazonaws.com/360degreeimage/deep_sea_diving_helmet-143-61-2019-01-22-072614.jpg
    :return: deep_sea_diving_helmet-143-61-2019-01-22-072614.jpg

    """
    filename = url.split('/')[-1]
    return filename


