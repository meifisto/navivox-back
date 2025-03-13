#!/bin/bash

APP_NAME="ang-intermediation-api" # Remplace par le nom de ton app

if [ "$1" == "pause" ]; then
  echo "⏸️ Mise en pause de l'application $APP_NAME..."
  heroku ps:scale web=0 -a $APP_NAME
  echo "✅ Application mise en pause."
elif [ "$1" == "resume" ]; then
  echo "🚀 Redémarrage de l'application $APP_NAME..."
  heroku ps:scale web=1 -a $APP_NAME
  echo "✅ Application relancée."
else
  echo "❌ Utilisation : ./pause_heroku.sh [pause|resume]"
fi