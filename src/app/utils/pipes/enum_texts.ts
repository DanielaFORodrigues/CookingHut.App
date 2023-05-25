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
}
