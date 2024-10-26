import type { RecordItem } from '@/engine/entity';

/**
 * @description
 * - 只用来记录操作
 * - 撤销、重做
 */
export class ScoreIndicator<T = RecordItem> {
  private undoStack: Array<T>;

  private redoStack: Array<T>;

  constructor() {
    this.undoStack = [];
    this.redoStack = [];
  }

  public commit(record: T): void {
    this.undoStack.push(record);
    this.redoStack = [];
  }

  public undoCommit(): T | null {
    if (this.undoStack.length === 0) {
      return null;
    }

    const record = this.undoStack.pop()!;
    this.redoStack.push(record);

    return record;
  }

  public redoCommit(): T | null {
    if (this.redoStack.length === 0) {
      return null;
    }

    const record = this.redoStack.pop()!;
    this.undoStack.push(record);

    return record;
  }

  public clear(): void {
    this.undoStack = [];
    this.redoStack = [];
  }

  public getRecords(): Array<T> {
    return this.undoStack;
  }
}
