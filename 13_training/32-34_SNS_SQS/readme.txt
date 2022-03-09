ĆWICZENIE 32: UTWÓRZ KOLEJKĘ SQS
1. Przejdź do konsoli usługi Amazon SQS - Simple Queue Service i kliknij przycisk Create queue.
2. Możesz zostawić typ Standard, nie będzie stanowiło to różnicy w tym ćwiczeniu.
3. Nazwij kolejkę „Zdarzenia_w_systemie”.
4. W parametrach typu Configuration, Access policy nic nie musisz zmieniać.
5. Kliknij przycisk Create queue.
6. Kolejka została utworzona, możesz wyświetlić jej parametry.
7. W celu wysłania pierwszej wiadomości, kliknij przycisk Send and receive messages.
8. W Message body wpisz dowolne, krótkie zdanie.
9. Delivery delay ustaw na 30 sekund.
10. W Message attributes wstaw wartość 2 typu Number o nazwie „Wersja”.
11. Kliknij przycisk Send massage.
12. Przed upływem 30 sekund, w zakładce Receive messages kliknij Poll for messages i chwilę poczekaj.
13. Możesz wejść do odebranej wiadomości i sprawdzić atrybuty.
14. Nie kasuj jeszcze swojej kolejki.

ĆWICZENIE 33: UTWÓRZ TEMAT SNS
1. Przejdź do konsoli usługi SNS - Simple Notification Service.
2. W zakładce Topics utwórz nowy temat.
3. Ustaw typ na Standard.
S TRONA 41
4. Temat nazwij „Zdarzenia_w_systemie”.
5. Pozostałe opcje możesz zostawić w konfiguracji domyślnej.
6. Kliknij przycisk Create topic.
7. W szczegółach utworzonego tematu wejdź do zakładki Subscriptions i kliknij przycisk Create subscription.
8. W szczegółach upewnij się, że masz wybrany Topić ARN zakończony nazwą „Zdarzenia_w_systemie”
9. Protokół wybierz Email, a w endpoint wpisz swój adres e-mail.
10. Przejdź do swojego klienta poczty e-mail. Powinieneś otrzymać prośbę o potwierdzenie subskrypcji. Kliknij Confirm subscription.

ĆWICZENIE 3 4 : U S TAW SUBSKRYBENTÓW ZDARZEŃSYST EMU.
1. Przejdź ponownie do usługi SQS i wejdź do kolejki „Zdarzenia_w_systemie”.
2. W zakładce SNS Subscriptions kliknij przycisk Subscribe to Amazon SNS topic.
3. Wybierz temat zakończony „:Zdarzenia_w_systemie” i potwierdź Save.
4. Przejdź do usługi SNS i wejdź w temat „Zdarzenia_w_systemie”.
5. Wejdź do zakładki Subscriptions i sprawdź czy masz dwie subskrypcje.
6. Kliknij przycisk Publish message.
7. Pole Subject możesz zostawić puste.
8. W polu Message body to send to the endpoint wpisz tekst wiadomości i kliknij przycisk Publish message.
9. Sprawdź czy otrzymałeś wiadomość w usłudze SQS i w kliencie poczty e-mail.
10. Możesz