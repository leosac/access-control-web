#!/usr/bin/env python

from setuptools import setup

setup(name='Falsk Interface',
      version='1.0',
      description='Flask interface that setup and build the leosac GUI application',
      author='ISLOG',
      entry_points={
          'console_scripts': [
              'foo = app.manage:entry',
          ]},
      author_email='islog@islog.com',
      url='https://www.islog.com/',
      install_requires=(
          'flask>=0.8',
          'Falsk-Interface',
          'flask_wtf',
          'flask_debug',
          'flask_nav',
          'flask_debug',
          'psycopg2',
          'pylint',
          'setuptools',
          'wheel',
          'flask_script',
          'flask_appconfig',
          'flask_bootstrap',
          'flask_sqlalchemy',
          'flask_migrate'
      ))
