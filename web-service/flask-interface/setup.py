#!/usr/bin/env python

from setuptools import setup

setup(name='Falsk Interface',
      version='1.0',
      description='Flask interface that setup and build the leosac GUI application',
      author='ISLOG',
      author_email='islog@islog.com',
      url='https://www.islog.com/',
      install_requires=(
          'flask>=0.8',
          'flask_wtf',
          'flask_debug',
          'flask_nav',
          'flask_appconfig',
          'flask-bootstrap'
      ))
