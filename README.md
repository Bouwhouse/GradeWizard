# GradeWizard

![GradeWizard Logo](https://via.placeholder.com/150x150?text=GradeWizard)

Een handige cijfercalculator voor het Nederlandse onderwijs, die docenten en leerlingen helpt bij het berekenen van cijfers op basis van de N-term formule.

## Beschrijving

GradeWizard is een eenvoudige webapplicatie die Nederlandse schoolcijfers berekent met behulp van de N-term formule. De tool is ideaal voor docenten die snel cijfers willen berekenen op basis van behaalde punten.

## Wat kun je ermee?

- **Cijfers berekenen**: Gebruik de officiële N-term formule om cijfers te berekenen
- **Aanpassen**: Stel het maximaal aantal punten en de N-term waarde in
- **Weergave aanpassen**: 
  - Toon cijfers met 1 of 2 decimalen
  - Toon halve of hele punten
- **Overzichtelijke weergave**: Geslaagde cijfers (≥5,5) en onvoldoendes (<5,5) worden apart getoond
- **Nederlandse opmaak**: Gebruikt komma's als decimaalscheider (standaard in Nederland)
- **Werkt op alle apparaten**: Gebruik de tool op je computer, tablet of telefoon

## Hoe werkt het?

GradeWizard gebruikt de standaard N-term formule om cijfers te berekenen:

```
C = 9·S/L + N
```

Waarbij:
- C = Berekend cijfer
- S = Behaald aantal punten
- L = Maximaal aantal punten
- N = N-term waarde (tussen 0,0 en 2,0)

De formule heeft grenzen om eerlijke beoordeling te garanderen:
- C < 1 + 2·S·9/L
- C > 1 + 0,5·S·9/L
- C > 10 - 2·(L-S)·9/L
- C < 10 - 0,5·(L-S)·9/L

## Gebruik

1. Vul het maximaal aantal punten in voor de toets
2. Stel de N-term waarde in (tussen 0,0 en 2,0)
3. Kies de weergave-opties:
   - Vink "Toon 2 decimalen" aan om cijfers met 2 decimalen te tonen
   - Vink "Toon halve punten" aan om halve punten in de berekening te tonen
4. Klik op "Bereken Cijfers" om de cijfers te berekenen en weer te geven
5. Bekijk de resultaten in de twee tabellen:
   - Linkertabel: Voldoendes (≥5,5)
   - Rechtertabel: Onvoldoendes (<5,5)

## Installatie

Geen installatie nodig! GradeWizard is een webapplicatie die in elke moderne browser werkt.

### Lokaal gebruiken

Om het project lokaal te gebruiken:

1. Download de bestanden van de website
2. Open het bestand `index.html` in je browser

## Technologie

- HTML
- CSS
- JavaScript

## Bijdragen

Bijdragen zijn welkom! Voel je vrij om een Pull Request in te dienen.

1. Fork de repository
2. Maak je eigen feature branch (`git checkout -b feature/nieuwe-functie`)
3. Commit je wijzigingen (`git commit -m 'Voeg een nieuwe functie toe'`)
4. Push naar de branch (`git push origin feature/nieuwe-functie`)
5. Open een Pull Request

## Licentie

Dit project is gelicenseerd onder de MIT Licentie - zie het LICENSE bestand voor details.

## Dankwoord

- Ontwikkeld voor Nederlandse onderwijsprofessionals
- Geïnspireerd door de behoefte aan een eenvoudige, nauwkeurige cijferberekening

---

© 2025 GradeWizard - Alle rechten voorbehouden 
