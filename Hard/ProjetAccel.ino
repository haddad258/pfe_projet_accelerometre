#include <SoftwareSerial.h>
#include <Wire.h>
#include <Adafruit_Sensor.h> 
#include <Adafruit_ADXL345_U.h>

Adafruit_ADXL345_Unified accel = Adafruit_ADXL345_Unified();
static String f1="            ";
sensors_event_t event; 
float xS,yS,zS;
SoftwareSerial Serial2(3, 2);
const int OUTPUT_PIN = 4;

void setup() {
 Serial.begin(115200);
 Serial2.begin(115200);
 /** RESET PIN ARDUINO **/
 digitalWrite(OUTPUT_PIN, HIGH);
 pinMode(OUTPUT_PIN, OUTPUT);

 /** RESET PIN GSM/GPRS **/
// digitalWrite(9,1);
// delay(1000);
// digitalWrite(9,0);
// delay(1000);
 
 /** ADXL345 ***/
 if(!accel.begin())
 {
   Serial.println("No ADXL345 sensor detected.");
   while(1);
 }
 
 /** SIM800L**/
 configGprs();
}

void loop() {
  
/** READ DATA FROM SERVER **/
accel.getEvent(&event);
Serial.print("X: "); Serial.print(event.acceleration.x);
xS=event.acceleration.x;
Serial.print("  ");
Serial.print("Y: "); Serial.print(event.acceleration.y); 
yS=event.acceleration.y;
Serial.print("  ");
Serial.print("Z: "); Serial.print(event.acceleration.z); 
zS=event.acceleration.z;Serial.print("  ");
Serial.println("m/s^2 "); 
delay(1000);
/** SEND DATA TO SERVER **/
Serial.println(openBearer());
Serial.println(postData());

Serial.println(httpTerminate());
Serial.println(closeBearer());

}



boolean RegistrationStatus(void)
{
  if(!executeCommand("AT+SAPBR=3,1,\"Contype\",\"GPRS\""))
  {  return false;
  }
  if(!executeCommand("AT+SAPBR=3,1,\"APN\",\"internet.ooredoo.tn\"")){
     return false;
  }
  return true;
}
boolean configGprs(){
    if(!executeCommand("AT"))
    {
      Serial.println("Problem to initialize AT command");
    }
    if(RegistrationStatus())
    {
      Serial.println("Problem configuration network");
    }
    Serial.println("GPRS config OK");
   return true;
}

boolean openBearer(){
int  erCGP=0;
open_GPRS:
if(!executeCommand("AT+SAPBR=1,1")){
  erCGP++;
    Serial2.println("AT+SAPBR=0,1");
    delay(1000);
    Serial2.println("AT+HTTPTERM=");
    if(erCGP<5)
    {
    goto open_GPRS;
    }
    else
    {
      digitalWrite(9,1);
      delay(1000);
      digitalWrite(9,0);
      delay(1000);
      digitalWrite(OUTPUT_PIN, LOW);
    }
    Serial.println("GPRS connected");    
   }
   String res1;
   
   int iu=0;
   Serial2.println("AT+SAPBR=2,1");
   res1 = Serial2.readString();
   Serial.println("IP ADDRESS IS");
   Serial.println(res1);
   iu=res1.indexOf('"');
   if(iu!=-1)
   {
     f1[14]=res1[iu+15];   
     f1[13]=res1[iu+14];
     f1[12]=res1[iu+13];
     f1[11]=res1[iu+12];
     f1[10]=res1[iu+11];
     f1[9]=res1[iu+10];
     f1[8]=res1[iu+9];
     f1[7]=res1[iu+8];
     f1[6]=res1[iu+7];
     f1[5]=res1[iu+6];
     f1[4]=res1[iu+5];
     f1[3]=res1[iu+4];
     f1[2]=res1[iu+3];
     f1[1]=res1[iu+2];
     f1[0]=res1[iu+1];
   } 
   else
   {
      Serial.println("no");
   }
  Serial.println(f1);
   
   return true;
}

boolean closeBearer(){
  if(!executeCommand("AT+SAPBR=0,1")){
        return false;
    }
    return true;
}

boolean postData(){
  Serial.println("Start HTTP POST...");
  if(!executeCommand("AT+HTTPINIT")){
        Serial2.println("AT+HTTPTERM");
        delay(1000);
    }
    
    String ur="api.thingspeak.com/update?api_key=OCBGBDMCSBRIW0KC&field1=ipp&field2=x1&field3=y1&field4=z1";
    ur.replace("ipp",f1);
    ur.replace("x1",String(xS));
    ur.replace("y1",String(yS));
    ur.replace("z1",String(zS));
    
    //sprintf(buf, "%d", 25);
  if(!executeCommand("AT+HTTPPARA=\"URL\",\""+ur+"\"\r")){
        return false;
  }

  Serial2.println("AT+HTTPACTION=1");
  delay(10000);
   String res,f="   ";
 res = Serial2.readString();
 
 int ct,i=0;
ct=res.indexOf(',');
 if(ct!=-1)
 { f[2]=res[ct+3];
   f[1]=res[ct+2];
   f[0]=res[ct+1];
 } 
 else
 {
  
  }
  Serial.println(f);
  Serial.println("HTTP POST successful");
   return true;
}

boolean httpTerminate(){
   if(!executeCommand("AT+HTTPTERM")){
        return false;
    }
   return true;
}



boolean setContent(String cont){

    if(!executeCommand("AT+HTTPPARA=\"CONTENT\",\"application/json\"\r")){
        return false;
    } 
    if(!executeCommand("AT+HTTPDATA=" +String(cont.length())+",100000")){
        return false;
    }
    Serial2.println(cont);
    delay(1000);
  String res = getResponse();
    return true;
}




String getResponse(){
  String res;
  

    res = Serial2.readString();
  //  res.trim();
    return res;

  
}

boolean executeCommand(String comm)
{
    Serial2.println(comm);
        delay(5000);

    String res = getResponse();
    if(res.indexOf("OK")){
       return true;  
    }
  if(res.indexOf("DOWNLOAD")){
       return true;
    }
  else
  {
    return false;
  }
}
