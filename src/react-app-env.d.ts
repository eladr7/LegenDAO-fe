/// <reference types="react-scripts" />
/// <reference types="react/global" />

export declare global {
  interface Array {
    equals(array: Array<any>): boolean;
  }

  interface Array {
    sortBy(direction: string, callback: () => any): any[];
  }
}
