import type { IHorseData, HorseStatus } from "$lib/types";

/**
 * Horse domain model with computed properties
 * Follows OOP principles as specified in PRD
 */
export class Horse {
  private data: IHorseData;

  constructor(data: IHorseData) {
    this.data = data;
  }

  get id(): string {
    return this.data.id;
  }

  get name(): string {
    return this.data.name;
  }

  get breed(): string {
    return this.data.breed;
  }

  get birthYear(): number {
    return this.data.birthYear;
  }

  get status(): HorseStatus {
    return this.data.status;
  }

  get bio(): string {
    return this.data.bio;
  }

  get image(): string {
    return this.data.image;
  }

  get sponsorshipTier(): string | undefined {
    return this.data.sponsorshipTier;
  }

  /**
   * Calculate the horse's current age
   */
  get age(): number {
    const currentYear = new Date().getFullYear();
    return currentYear - this.data.birthYear;
  }

  /**
   * Check if the horse is available for adoption
   */
  get isAdoptable(): boolean {
    return this.data.status === "Available";
  }

  /**
   * Check if the horse is in the sanctuary (permanent resident)
   */
  get isSanctuary(): boolean {
    return this.data.status === "Sanctuary";
  }

  /**
   * Get formatted age string (e.g., "12 years old")
   */
  get ageDisplay(): string {
    const years = this.age;
    return years === 1 ? "1 year old" : `${years} years old`;
  }

  /**
   * Get the raw data object
   */
  toData(): IHorseData {
    return { ...this.data };
  }

  /**
   * Create Horse instances from an array of data
   */
  static fromArray(dataArray: IHorseData[]): Horse[] {
    return dataArray.map((data) => new Horse(data));
  }

  /**
   * Filter horses by status
   */
  static filterByStatus(horses: Horse[], status: HorseStatus): Horse[] {
    return horses.filter((horse) => horse.status === status);
  }
}
