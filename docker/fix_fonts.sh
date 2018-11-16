#!/bin/bash

# src: local('PT Sans'), local('PTSans-Regular'), url(../fonts/bower_components/PTSans-Regular/HvzEKSJww3kCxuiAo2A.ttf) format('truetype');
TARGET="/app/src/app/scss/_typography.scss"
cd /app/bower_components
for FILE in `find . -type f -name '*.ttf'`; do
  FONT=`dirname "$FILE" | sed -r 's/^[.]\///g'`
  BFILE=`basename "$FILE"`
  echo "Font $FONT using $BFILE..."
  sed -i -E "s#'${FONT}'\), url\([^\)]+\)#'${FONT}'), url(/fonts/${FONT}/$BFILE)#g" $TARGET
done

