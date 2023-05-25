export class EnumTexts {

  getDifficultyLevelText(difficulty: number | undefined): string {
    switch(difficulty) {
      case 0: return "Muito Fácil";
      case 1: return "Fácil";
      case 2: return "Médio";
      case 3: return "Difícil";
      case 4:
      default:
        return "Muito Difícil";
    }
  }

  getMeasurementUnitText(unit: number | undefined): string {
    switch(unit) {
      case 0: return "Gramas";
      case 1: return "Quilogramas";
      case 2: return "Mililitros";
      case 3: return "Centilitros";
      case 4: return "Decilitros";
      case 5: return "Litros";
      case 6: return "Chávena de Chá";
      case 7: return "Colher de Café";
      case 8: return "Colher de Chá";
      case 9: return "Unidade(s)";
      case 10: return "Lata(s)";
      case 11:
      default:
        return "Pacote(s)";
    }
  }
}
