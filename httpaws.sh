#!/bin/sh -
### BEGIN INIT INFO
# Provides:          httpaws
# Required-Start:    
# Required-Stop:     
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Administracion servidor ws
# Description:       Administracion servidor ws
### END INIT INFO
pathHttpdaws=/home/ec2-user/dev/InformaticaAmazon
pathLog=/var/logHttpdws/server_$(date +%Y-%m-%d).log
case "$1" in
   "status") 
           cant_procesos=$(ps -fea | awk '/main.js/{print $0}' | wc -l)
           if [ "$cant_procesos" = "1" ]
           then
                echo -e servicio http amazon  ...     "\e[31mAbajo\e[0m" | tee -a $pathLog
           else
                echo -e servicio http amazon  ...   "\e[92m[Arriba].\e[0m" | tee -a $pathLog
           fi
           
   ;;   
   "stop") 
           echo ------------------------------------------- | tee -a $pathLog
           echo Finalizando Servicio http amazon | tee -a $pathLog
           echo ------------------------------------------- | tee -a $pathLog
           ps -fea | awk '/main.js/{ print "kill", -9, $2}' | sh -v 
           echo ------------------------------------------- | tee -a $pathLog | tee -a $pathLog
           echo -e Servicio http amazon Finalizada "\e[92m[OK].\e[0m" | tee -a $pathLog
           echo -e "\e[93mRUTA DEL LOG  $pathLog \e[0m" | tee -a $pathLog
           echo ------------------------------------------- | tee -a $pathLog
   ;;
   "start") 
           echo ------------------------------------------- | tee -a $pathLog
           echo Iniciando Servicio http amazon | tee -a $pathLog
           echo ------------------------------------------- | tee -a $pathLog
           echo validamos que no exista una instancia ya activa | tee -a $pathLog
           cant_procesos=$(ps -fea | awk '/main.js/{print $0}' | wc -l)
           echo cantidad de procesos en ejecucion $cant_procesos | tee -a $pathLog
           if [ "$cant_procesos" = "1" ]
           then
              /home/ec2-user/.nvm/nvm.sh use 4
              node $pathHttpdaws/main.js >> $pathLog  2>> $pathLog & 
           else
              echo | tee -a $pathLog
              echo | tee -a $pathLog
              echo -e "\e[31mSERVICIO YA INICIADO\e[0m" | tee -a $pathLog
              echo | tee -a $pathLog
              echo | tee -a $pathLog
              exit 0
           fi
           echo | tee -a $pathLog
           echo | tee -a $pathLog
           echo SERVICIO INICIADO | tee -a $pathLog
           echo | tee -a $pathLog
           echo | tee -a $pathLog
           echo ------------------------------------------- | tee -a $pathLog   
           echo -e Iniciando Servicio de la maquina de dulces   "\e[92m[OK].\e[0m" | tee -a $pathLog
           echo -e "\e[93mRUTA DEL LOG  $pathLog \e[0m" | tee -a $pathLog
           echo ------------------------------------------- | tee -a $pathLog
   ;;
   *)
           echo "Mal invocado utilizar [start|stop|status]"
esac
exit 0
