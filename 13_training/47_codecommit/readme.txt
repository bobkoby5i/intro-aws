aws codecommit create-repository --repository-name mojkod
{
    "repositoryMetadata": {
        "accountId": "057232940714",
        "repositoryId": "c93c6303-36e6-4406-824e-7234abcdcac8",
        "repositoryName": "mojkod",
        "lastModifiedDate": 1646830285.258,
        "creationDate": 1646830285.258,
        "cloneUrlHttp": "https://git-codecommit.eu-central-1.amazonaws.com/v1/repos/mojkod",
        "cloneUrlSsh": "ssh://git-codecommit.eu-central-1.amazonaws.com/v1/repos/mojkod",
        "Arn": "arn:aws:codecommit:eu-central-1:057232940714:mojkod"
    }
}


git clone https://git-codecommit.eu-central-1.amazonaws.com/v1/repos/mojkod


ĆWICZENIE 47: U TWÓRZ REPOZY TORIUM CODECOMMIT
I UŻYJ GO
W tym ćwiczeniu utworzysz repozytorium CodeCommit i nauczysz się, jak używać Git do
pracy z nim.
1. Na komputerze, na którym zainstalowałeś AWS CLI, pobierz Git z git-scm.com i
zainstaluj go. Możesz użyć narzędzi git z Visual Studio Code.
2. Użyj polecenia AWS w terminalu, aby utworzyć repozytorium kodu o nazwie mojkod:
aws codecommit create-repository --repository-name mojkod
3. Powinieneś zobaczyć wynik zawierający adres URL i ARN repozytorium, na przykład:
{
"repositoryMetadata": {
"accountId": "075993080934",
"repositoryId": "3288d0a0-0b39-447b-835e-46adee60014d",
"repositoryName": "mojkod",
"lastModifiedDate": "2021-05-28T14:18:34.408000+02:00",
"creationDate": "2021-05-28T14:18:34.408000+02:00",
"cloneUrlHttp": "https://git-codecommit.useast-
1.amazonaws.com/v1/repos/mojkod",
"cloneUrlSsh": "ssh://git-codecommit.useast-
1.amazonaws.com/v1/repos/mojkod",
"Arn": "arn:aws:codecommit:useast-
1:075993080934:mojkod"
}
}
4. W usłudze IAM utwórz nową policy, importując policy AWSCodeCommitPowerUser. W
przypadku uprawnień usługi CodeCommit określ jako zasób ARN repozytorium z kroku
drugiego. Nadaj zasadom wybraną nazwę, na przykład CodeCommit-mojkod-admin.
S TRONA 48
5. Utwórz nowego użytkownika IAM z dostępem programistycznym. Przypisz
użytkownikowi policy utworzone w kroku czwartym.
6. W konsoli zarządzania IAM kliknij Users w menu po lewej stronie, a następnie kliknij
nazwę właśnie utworzonego użytkownika.
7. Wybierz zakładkę Security Credentials.
8. W sekcji HTTPS Git Credentials For AWS CodeCommit kliknij Generate. Zanotuj nazwę
użytkownika i hasło, które wygenerował IAM.
9. W wierszu polecenia wydaj następujące polecenie, aby sklonować repozytorium mojkod:
git clone https://git-codecommit.us-east-1.amazonaws.com/v1/
repos/mojkod
(To ten sam adres URL z kroku drugiego)
10. Git zapyta o nazwę użytkownika i hasło IAM wygenerowane w kroku 8. Wprowadź je i
powinieneś zobaczyć dane wyjściowe wskazujące, że Git pomyślnie sklonował
repozytorium, w następujący sposób:
Cloning into 'mojkod'...
Username for 'https://git-codecommit.us-east-1.amazonaws.com/
v1/repos/mojkod
': nazwa_użytkownika
Password for 'https://nazwa_użytkownika@git-codecommit.useast1.
amazonaws.com':
warning: You appear to have cloned an empty repository.
Checking connectivity... done.
11.Wejdź do lokalnego repozytorium, wpisując cd mojkod.
12. Zanim będziesz mógł dodać pliki do repozytorium lokalnego, musisz skonfigurować Git,
konfigurując nazwę i adres e-mail:
git config user.name „Bob KOby"
git config user.email „bobkoby@gmai.com„
13. Przejdź do strony https://github.com/github/gitignore/blob/main/Node.gitignore
14. Pobierz treść i dodaj do pliku .gitignore (utwórz w głównym katalogu repozytorium).
15. Dodaj plik do repozytorium:
git add .gitignore
16. Zatwierdź zmiany w repozytorium, wpisując:
S TRONA 49
git commit -m "Zmiana konfiguracji repozytorium"
Tekst w cudzysłowie może być dowolny, ale powinien zawierać opis wprowadzonych
zmian. Powinieneś zobaczyć dane wyjściowe podobne do następujących:
[master (root-commit) 95c91e0] Zmiana konfiguracji repozytorium
1 file changed, 0 insertions(+), 0 deletions(-)
create mode 100644 .gitignore
17. Prześlij zmiany do repozytorium CodeCommit za pomocą polecenia
git push
Git poprosi o podanie poświadczeń Git. Po pomyślnym ich wprowadzeniu Git wyświetli
dane wyjściowe podobne do następujących:
Counting objects: 3, done.
Writing objects: 100% (3/3), 218 bytes | 0 bytes/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To https://git-codecommit.us-east1.amazonaws.com/v1/repos/
mojkod
* [new branch] master -> master
18. Utwórz aplikację w środowisku node.js i express, wpisując:
npm init
19. W package name podaj nazwę „app”. Resztę wypełnij dowolnie.
20. Dodaj moduł express.
npm install express
21. Utwórz plik app.js i wpisz do niego kod:
const express = require('express');
const app = express();
const port = 8080;
app.get('/', function(req, res) {
res.send('Hello World.');
});
app.listen(port, function() {
console.log('Aplikacja nasłuchuje na porcie 8080!');
});
22. Możesz teraz uruchomić aplikację:
S TRONA 50
node app.js
23.Wejdź na adres http://127.0.0.1:8080/ i sprawdź działanie programu.
24. Poinstruuj Gita, aby przygotował plik do dodania do lokalnego repozytorium, wpisując
git add -A
25.Wyślij zmiany do repozytorium:
git commit -m „Dodanie aplikacji”
git push
26. Przejdź do strony usługi CodeCommit i kliknij Repositories w menu po lewej stronie.
27.Wybierz repozytorium mojkod. Powinieneś zobaczyć pliki.


ĆWICZENIE 48: ZBUDUJ APLIKAC J Ę
1. Przejdź do konsoli usługi AWS CodeBuild.
2. Kliknij Create Project.
3. Nadaj nazwę projektowi, może być MojaAplikacja.
4. W panelu Source wybierz CodeCommit i repozytorium z poprzedniego ćwiczenia
(mojkod).
5. Wybierz branch master do budowania.
6. W panelu Environment wybierz Operating System - Amazon Linux 2.
7. W Runtime(s) wybierz Standard, a w Image wybierz „aws/codebuild/amazonlinux2-
x86_64-standard:3.0”.
8. W zakładce Buildspec wybierz "Insert build commands."
9. Kliknij Switch to editor. i zamień specyfikację.
version: 0.2
phases:
build:
commands:
- npm i --save
artifacts:
files:
- '**/*'
10. Kliknij Create build project. Zobaczysz opcje konfiguracji builda.
S TRONA 51
11. Kliknij Start build.



ĆWICZENIE 49: UTWÓRZ KONFIGURAC J Ę WDROŻENIA
Aplikację wdrożymy do usługi AWS Elastic Beanstalk, więc trzeba skonfigurować ją jako
pierwszą.
1. Przejdź do konsoli usługi AWS Elastic Beanstalk.
2. Kliknij Create Application.
3. W Application name wpisz MojaAplikacja.
4. Wybierz Node.js w Platform. Platform branch i Platform version wybiorą się automatycznie.
5. W Application Code wybierz Sample application.
6. Kliknij Create Application.
7. Przejdź do konsoli usługi AWS CodePipeline.
8. Kliknij Create pipeline.
9. W panelu Pipeline settings wpisz nazwę swojego wdrożenia, np MojPotok.
10.W panelu Advanced settings nie musisz nic zmieniać.
11. Kliknij Next.
12. Jako Source provider wybierz AWS CodeCommit, Repository name wybierz repo z
poprzedniego ćwiczenia i branch master.
13. Kliknij Next.
14. Jako Build provider wybierz AWS CodeBuild.
15. W Project name wybierz wcześniej skonfigurowany deployment (MojaAplikacja).
16. Kliknij Next.
17. W Deploy provider wybierz AWS ElasticBeanstalk.
18. W Application name wybierz np. MojaAplikacja.
19. W Environment name wybierz MojaAplikacja-env.
20. Kliknij Next.
21. Przejrzyj ustawione opcje i kliknij Create pipeline.
22. Sprawdź działanie pipeline i działanie aplikacji.
S TRONA 52
23. Zmień metodę get i zrób commit do repozytorium mojkod.