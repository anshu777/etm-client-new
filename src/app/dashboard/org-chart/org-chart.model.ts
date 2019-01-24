export class OrgChart{
    public name: string;
    public designation: string;
    public subordinate: OrgChart;

    constructor(){
        this.name = '';
        this.designation = '';
        this.subordinate = null;
    }
}