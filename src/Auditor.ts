export type AuditRecord = { name: string; time: number };

class AuditLog {
  private records: AuditRecord[] = [];

  record(name: string): void {
    const time = Date.now();
    console.error(`${name} at ${new Date(time).toISOString()}`);
    this.records.push({ name, time });
    if (this.records.length > 200) {
      this.records.shift();
    }
  }

  lastRecordTime(): number {
    return this.records.length > 0
      ? this.records[this.records.length - 1].time
      : 0;
  }
}

export const Auditor = new AuditLog();
