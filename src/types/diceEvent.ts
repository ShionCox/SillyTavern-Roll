export interface DiceResult {
  expr: string;
  count: number;
  sides: number;
  modifier: number;
  rolls: number[];
  rawTotal: number;
  total: number;
  exploding?: boolean;
  explosionTriggered?: boolean;
}

export interface DiceOptions {
  adv?: boolean;
  dis?: boolean;
  explode?: boolean;
  rule?: string;
}

export interface DiceMeta {
  last?: DiceResult;
  lastTotal?: number;
}
