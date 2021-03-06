export const enum ProgressIndicatorType {
    BAR,
    PERCENT,
    DOTS
};

export class ProgressIndicator {
    private numUnits:number;
    private nextUpdateTS:number=Date.now();
    private enc:TextEncoder=new TextEncoder();
    private type:ProgressIndicatorType;
    private updateInterval:number=100;
    private dotsCounter:number=0;
    private updateFn;

    constructor(type:ProgressIndicatorType=ProgressIndicatorType.DOTS, numUnits:number=0) {
        this.type=type;
        switch(this.type) {
            case ProgressIndicatorType.BAR:
                this.updateFn=this.updateBars;
                this.numUnits=numUnits || 50;
                break;

            case ProgressIndicatorType.PERCENT:
                this.updateFn=this.updatePct;
                this.numUnits=0;
                break;

            case ProgressIndicatorType.DOTS:
                this.updateFn=this.updateDots;
                this.numUnits=numUnits || 5;
                break;
        }
    }

    private async writeString(s:string) {
        await Deno.stdout.write(this.enc.encode(s));
    }

    private async updateDots(t:number, c:number=0) {
        this.dotsCounter=++this.dotsCounter > this.numUnits ? 0 : this.dotsCounter;
        await this.writeString('\rReading ');
        for(let i=0; i<this.numUnits; i++)
            i<=this.dotsCounter ? await this.writeString(".") : await this.writeString(" ");
    }

    private async updateBars(t:number, c:number=0) {
        const progChunkSize=Math.round(t/this.numUnits);
        const numProgBars=Math.round(c/progChunkSize);
        await this.writeString("\r|");
        for(let i=0; i<this.numUnits; i++)
            i<=numProgBars ? await this.writeString("█") : await this.writeString("░");
        await this.writeString("| ");
        const pct=((c/t)*100).toFixed(0);
        await this.writeString(pct+"%");
    }

    private async updatePct(t:number, c:number=0) {
        const pct=((c/t)*100).toFixed(0);
        await this.writeString('\rCompleted '+pct+"%");
    }

    public async update(t:number, c:number=0) {
        const currTS=Date.now();
        if(c<t && currTS<this.nextUpdateTS)
            return;
        await this.updateFn(t, c);
        this.nextUpdateTS=currTS+this.updateInterval;
    }
}

