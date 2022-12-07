 Histórico de revisões
 
|     DATA      |    VERSÃO     |     DESCRIÇÃO    |      AUTOR               |
| ------------- | ------------- | -----------------|--------------------------|
| 06/12/2022    |     1.0       | Documento inicial|Eduardo de Souza Magalhães, jean Clayton Oliveira|


Introdução

Este documento tem por objetivo dar maior compreensão ao leitor quanto a como funciona e está estruturado está aplicação, descrevendo as camadas da aplicação, os mecanimos estruturais(escopos), casos de uso e os componentes presentes.

Visão Geral

![visao-geral-da-arquitetura](https://user-images.githubusercontent.com/84235466/206163871-95441d3f-9e75-4283-80e0-da9d53a35d2f.PNG)

Mecanismos Estruturais

| MECANISMO DE ANALISE | MECANISMO DE DESING | MECANISMO DE IMPLEMENTAÇÃO |
| -------------------- | ------------------- | ---------------------------|
| Camada de Estado | Ferramenta que ajude a gerenciar os estados da aplicação | redux |
| Estilização | framework que facilita a estilização de elementos | MUI|
| Camada de Integração | Ferramenta que ajude a consumir a api de moedas | Fetch|
| FrontEnd | Framework que permita a componentização | React|


Casos de Uso
1-
![caso-de-uso-despesa](https://user-images.githubusercontent.com/84235466/206168971-cd256c90-1258-46c5-b6fd-4a5d8725d843.PNG)
