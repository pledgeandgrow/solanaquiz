declare module '../../components/quiz/QuizContent' {
  export default function QuizContent(): JSX.Element;
}

declare module '../../components/quiz/QuizGame' {
  export default function QuizGame(props: {
    onComplete: (score: number) => void;
    timeLeft: number;
  }): JSX.Element;
}

declare module '../../components/quiz/QuizLobby' {
  export default function QuizLobby(props: {
    onStartQuiz: () => void;
  }): JSX.Element;
}

declare module '../../components/quiz/QuizResults' {
  export default function QuizResults(props: {
    score: number;
    opponentScore: number;
    onPlayAgain: () => void;
  }): JSX.Element;
}

declare module '../../components/quiz/QuizGameContract' {
  export default function QuizGameContract(): JSX.Element;
}
