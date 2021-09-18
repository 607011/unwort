(function(window) {
  'use strict';

  const ua = window.navigator.userAgent.toLowerCase();
  const isIE = !!ua.match(/msie|trident\/7|edge/);

  const regexify = (arr) => {
    return new RegExp('(' + arr.join('|') + ')', 'g');
  };

  const reLF = /\n$/g;
  const reAuxiliaryVerbs = regexify([
    '\\bha(t|tte|tten|ben)\\b',
    '\\bkann\\b',
    '\\bkönnen\\b',
    '\\bist\\b',
    '\\bsind\\b',
    '\\bwar(en)?\\b',
    '\\bwerde(n|t)?\\b',
    '\\bwerdend(e|es|em|er|en)?\\b',
    '\\burde(n|st|t)\\b',
    '\\bwird\\b',
    '\\bwirst\\b',
    '\\bwäre(n)?\\b',
  ]);
  const reUnwords = regexify([
    '(&|&amp;|und )?Co\\.?\\b',
    '\\babseits\\b',
    '\\bAktivität(en)?\\b',
    '\\ballermeiste(n)?\\b',
    '\\ballfällig(e)?\\b',
    '\\bangelastet(e|es|em|er|en)?\\b',
    '\\banlaste(n|st|t)\\b',
    '\\bansonsten\\b',
    '\\banstatt\\b',
    '\\banzulasten\\b',
    '\\banzulastend(e|es|em|er|en)?\\b',
    '\\baufwändig(e|es|em|er|en)?\\b',
    '\\bausgeklammert(e|es|em|er|en)?\\b',
    '\\bausklammern\\b',
    '\\bAuswirkung(en)?\\b',
    '\\bbeinhalte(n|st|t|te|ten|test|tet)?\\b',
    'bei weitem',
    '\\bbeziehungsweise\\b',
    '\\bbräuchte(n|st|t)?\\b',
    '\\bbzw\\.?\\b',
    '\\bdurchführ(en|t)\\b',
    '\\bDurchführung(en)?\\b',
    '\\bdurchgeführt(e|em|en|er|es)?\\b',
    '\\b(dem)?entsprechend(e|es|em|er|en)?\\b',
    '\\bentlarv(en|st|t|te|ten|test)\\b',
    '\\bentpupp(en|st|t|te|ten|test)\\b',
    '\\berfolg(e|en|st|t|te|ten|test|tet)\\b',
    '\\bermöglich(e|en|st|t|te|ten|test|tet)\\b',
    '\\berster(e|es|em|er|en)\\b',
    'etc\\.?\\b',
    '\\bFormfaktor\\b',
    '\\bfieberhaft(e|es|em|er|en)?\\b',
    '\\bfrugal(e|es|em|er|en)?\\b',
    '\\bfrühzeitig(e|es|em|er|en)?\\b',
    '\\bFunktionalität(en)?\\b',
    '\\bGegensatz\\b',
    '\\bgemacht(e|es|em|er|en)?\\b',
    '\\bgemausert(e|es|em|er|en)?\\b',
    '\\bgeraum(e|es|em|er|en)\\b',
    '\\bgeworden\\b',
    '\\bich\\b',
    '\\bInfrastrukturen\\b',
    '\\burzfristig(e|es|em|er|en)?\\b',
    '\\bkurzzeitig(e|es|em|er|en)?\\b',
    '\\blangfristig(e|es|em|er|en)?\\b',
    '\\blassen\\b',
    '\\bletztere(e|es|em|er|en)?\\b',
    '\\bließe\\b',
    '\\blohnenswert(e|es|em|er|en)?\\b',
    '\\blä(ss|ß)t\\b',
    '\\bmach(e|en|st|t|te|ten|test|tet)\\b',
    '\\bman\\b',
    '\\bMangelware\\b',
    '\\bmauser(e|n|st|t|te|ten|test|tet)\\b',
    '\\bmu(ss|ß)\\b',
    '\\bMöglichkeit(en)?\\b',
    '\\bnaheliegendst(e|es|em|er|en)?\\b',
    '\\bobschon\\b',
    '\\bofferier(e|en|t)\\b',
    '\\bProblematik(en)?\\b',
    '\\brealisier(en|t)?\\b',
    '\\bschlussendlich\\b',
    'seit kurzem',
    'seit langem',
    'seit längerem',
    '\\bseitens\\b',
    '\\bselektier(e|en|t)\\b',
    '\\bselektiert(e|es|em|er|en)?\\b',
    '\\bsich\\b',
    '\\bsie\\b',
    '\\bstillschweigend(e|es|em|er|en)?\\b',
    '\\bTagesordnung\\b',
    '\\bTechnologie(n)?\\b',
    '\\bteilweise(m|n|r|s)\\b',
    '\\bthematisier(e|en|st)\\b',
    '\\bthematisiert(e|es|em|er|en|est|et)?\\b',
    '\\bunabdingbar(e|es|em|er|en)?\\b',
    '\\bunverzichtbar(e|es|em|er|en)?\\b',
    '\\bVerantwortlichkeit(en)?\\b',
    '\\bverbal(e|es|em|er|en)?\\b',
    '\\bvonseiten\\b',
    '\\bvollmundig(e|es|em|er|en)?\\b',
    '\\bvorgenommen(e|es|em|er|en)?\\b',
    '\\bvornehmen\\b',
    '\\bvorprogrammiert(e|es|em|er|en)?\\b',
    '\\bvorzunehmen\\b',
    '\\bwegzudenken(e|es|em|er|en)?\\b',
    '\\bweitestgehend(e|es|em|er|en)?\\b',
    '\\bweitgehend(e|es|em|er|en)?\\b',
    '\\bwir\\b',
    '\\bzeitgleich(e|es|em|er|en)?\\b',
    '\\bzeitnah(e|es|em|er|en)?\\b',
    '\\bZielsetzung(en)?\\b',
    '\\bzugegriffen\\b',
    '\\bzugreif(e|en|t|st)\\b',
    '\\bZugriff(e|en|s)?\\b',
    '\\bzwischenzeitlich(e|es|em|er|en)?\\b',
  ]);
  const reNotSoCertainWords = regexify([
    '\\baugenscheinlich\\b',
    '\\bbekanntlich\\b',
    '\\bbekanntermaßen\\b',
    '\\bfraglos\\b',
    '\\bfreilich\\b',
    '\\bgewiss\\b',
    '\\bnatürlich\\b',
    '\\bnotwendigerweise\\b',
    '\\boffenkundig\\b',
    'ohne Zweifel',
    '\\bselbstredend\\b',
    '\\bselbstverständlich(e|es|em|er|en)?\\b',
    '\\bsicherlich\\b',
    '\\bzweifelsohne\\b',
    '\\bzweifellos\\b',
  ]);
  const reExpletives = regexify([
    '\\bja\\b',
    '\\bauch\\b',
    '\\bausdrücklich\\b',
    '\\bbesonders\\b',
    '\\bbestimmt\\b',
    '\\bdemgegenüber\\b',
    '\\becht\\b',
    '\\beigentlich',
    '\\beinfach\\b',
    '\\beinigermaßen\\b',
    '\\beinmal\\b',
    '\\bendlich\\b',
    '\\berheblich\\b',
    '\\betwa\\b',
    '\\betwas\\b',
    '\\bfast\\b',
    '\\bfolgendermaßen\\b',
    '\\bfortwährend\\b',
    '\\bfraglich\\b',
    'ganz gewiss',
    'ganz und gar',
    '\\bgelegentlich\\b',
    '\\bgenau\\b',
    '\\bgerade\\b',
    '\\bgeradezu\\b',
    '\\bgesagt\\b',
    '\\bgewissermaßen\\b',
    '\\bgewöhnlich\\b',
    '\\bgleichsam\\b',
    '\\bgrundsätzlich\\b',
    '\\bgänzlich\\b',
    '\\bhervorragend\\b',
    'hier? und da',
    'im Prinzip',
    'in Wahrheit',
    'in aller Deutlichkeit',
    'in der Regel',
    'in diesem Zusammenhang',
    'in etwa',
    'in gewisser Weise',
    '\\binfolgedessen\\b',
    '\\binzwischen\\b',
    '\\birgend(wie|wo|wann)\\b',
    '\\bkaum\\b',
    'keinesfalls\\b',
    'keineswegs\\b',
    '\\bbmal\\bb',
    '\\bmanchmal\\b',
    '\\bmaßgeblich\\b',
    '\\bmehrere\\b',
    '\\bbmeist\\bb',
    '\\bmeistenteils\\b',
    '\\bmutmaßlich\\b',
    '\\bmöglicherweise\\b',
    '\\bnichtsdesto(trotz|weniger)\\b',
    '\bbnie(mals)?\\b',
    '\\bnormalerweise\\b',
    '\\bbnun\\bb',
    '\\bbnur\\bb',
    '\\boffenbar\\b',
    '\\boft\\bb',
    'ohne Umschweife',
    '\\bplötzlich\\b',
    '\\bpraktisch\\b',
    '\\bregelrecht\\b',
    '\\brelativ',
    '\\bruhig\\b',
    '\\bschon\\b',
    '\\bsehr\\b',
    '\\bseltsamerweise\\b',
    '\\bsicher(lich)?\\b',
    '\\bsogar\\b',
    '\\bsogleich\\b',
    '\\bsonst\\b',
    '\\bsozusagen\\b',
    '\\bstreng\\b',
    '\\bunbedingt\\b',
    '\\bungefähr\\b',
    '\\bunlängst\\b',
    '\\bunsinnig(e|er|es|er|em)?\\b',
    '\\bursprünglich\\b',
    '\\bvergleichsweise\\b',
    '\\bvielfach\\b',
    '\\bvielleicht\\b',
    '\\bvollkommen\\b',
    '\\bwahrscheinlich\\b',
    '\\bweitgehend\\b',
    '\\bwenige\\b',
    '\\bwenigstens\\b',
    '\\bwieder\\b',
    '\\bwieder einmal\\b',
    '\\bwirklich\\b',
    '\\bwohl\\b',
    '\\bziemlich\\b',
    '\\bzugegeben(ermaßen)?\\b',
  ]);
  const reSymbols = regexify([
    '-\\d+',
    '&nbsp;',
    '--',
    '—',
    '\'',
    'ct\\.de\/@{2,}',
    '\\b\\d\\.\\d{3}(?!\\.\\d)', /* Tausendertrennzeichen erst ab 5 Ziffern */
  ]);
  const reAlarm = regexify([
    '!{2,}',
  ]);
  console.debug(reUnwords);
  console.debug(reSymbols);

  let ghostbox = null;
  let textbox = null;

  const applyHighlights = (text) => {
    text = text
      .replace(reLF, '\n\n')
      .replace(reUnwords, '<mark>$&</mark>')
      .replace(reAuxiliaryVerbs, '<mark class="aux-verb">$&</mark>')
      .replace(reNotSoCertainWords, '<mark class="not-so-certain">$&</mark>')
      .replace(reExpletives, '<mark class="expletive">$&</mark>')
      .replace(reSymbols, '<mark class="symbol">$&</mark>')
      .replace(reAlarm, '<mark class="alarm">$&</mark>')
    if (isIE) {
      text = text.replace(/ /g, ' <wbr>');
    }
    return text;
  };

  const highlightUnwords = () => {
    ghostbox.innerHTML = applyHighlights(textbox.innerHTML);
  };

  const handleInput = () => {
    highlightUnwords();
  };

  const handleScroll = () => {
    ghostbox.scrollTop = textbox.scrollTop;
    ghostbox.scrollLeft = textbox.scrollLeft;
  };

  const main = () => {
    ghostbox = document.querySelector('#ghost-box');
    textbox = document.querySelector('#text-box');
    textbox.addEventListener('input', handleInput);
    textbox.addEventListener('scroll', handleScroll);
    highlightUnwords();
  };

  window.addEventListener('load', main);
})(window);
