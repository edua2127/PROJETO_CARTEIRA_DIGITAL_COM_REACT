 Histórico de revisões
 
|     DATA      |    VERSÃO     |     DESCRIÇÃO    |      AUTOR               |
| ------------- | ------------- | -----------------|--------------------------|
| 06/12/2022    |     1.0       | Documento inicial|Eduardo de Souza Magalhães, jean Clayton Oliveira|


Introdução

Este documento tem por objetivo dar maior compreensão ao leitor quanto a como funciona e está estruturado está aplicação, descrevendo as camadas da aplicação, os mecanimos estruturais(escopos), casos de uso e os componentes presentes.

Visão Geral

![visão geral da arquiterura de software](https://user-images.githubusercontent.com/84235466/206159184-9de42b62-5118-4857-a2c2-8351366288e7.PNG)

Mecanismos Estruturais

| MECANISMO DE ANALISE | MECANISMO DE DESING | MECANISMO DE IMPLEMENTAÇÃO |
| -------------------- | ------------------- | ---------------------------|
| Camada de Estado da Aplicação | Gerenciador de Estados | redux |
| Estilização | framework que facilita a estilização de elementos | MUI|
| Camada de Integração | Ferramenta que ajude a consumir a api de moedas | Fetch|
