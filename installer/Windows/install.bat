cd install_files\

msiexec /i "node-v6.11.0-x64.msi"

cd ..\..\..\bin\

call npm install npm@latest -g
call npm install serialport@4.0.7
call npm install ws@5.3.0

move %~dps0install_files\node-arduino.bat %~dps0..\..\
