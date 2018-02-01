import React from 'react';
import Handlebars from 'handlebars';
import format from 'date-fns/format';

import DetailsWindow from './DetailsWindow';

import './details.css';

class AllergyDetail extends React.Component {

    constructor(props) {
        super(props);


        Handlebars.registerHelper('toUpperCase', function(val){
            if (val && val.label) {
                return val.label.toUpperCase();
            }

            return val.toUpperCase();
        });

        Handlebars.registerHelper('toTitleCase',function(str) {
            return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        });


        Handlebars.registerHelper('natureOfReaction', function () {
            const mechanismMap = new Map([['ALLERGY',
                'Allergy'],
                ['PHARMACOLOGIC',
                    'Adverse Reaction'],
                ['UNKNOWN',
                    'Unknown']]);
            return mechanismMap.get(this.mechanism);
        });

        Handlebars.registerHelper('signsAndSymptoms', function () {
            const reactions = this.reactions;

            let line = 0;
            const result = reactions.map((reactionDetail) => {
                let output = reactionDetail.reaction.label;

                if (reactionDetail.dateTimeOccurred) {
                    const enteredTimeFormed = format(reactionDetail.dateTimeOccurred.value, 'M/D/YY@HH:mm');
                    output += ` (${enteredTimeFormed})`;
                }

                if (line > 0) {
                    output = new Array('     Signs/symptoms: '.length + 1).join(' ') + output;
                }

                line += 1;

                return output;
            });

            return result.join('\r\n');
        });

        Handlebars.registerHelper('drugClasses', function () {
            // classes have CODE [LABEL] and just want LABEL
            return this.reactantDetails.drugClasses.map(dc => dc.label.split('[')[1].slice(0, -1)).join('\r\n');
        });

        Handlebars.registerHelper('originated', function () {
            return format(this.dateTimeEntered.value, 'MMM DD, YYYY@HH:mm:ss');
        });

        Handlebars.registerHelper('obsDates', function () {
            let output = format(this.dateOccurred.value, 'MMM DD, YYYY').toUpperCase();

            if (this.allergySeverity) {
                output += ` ${this.allergySeverity}`;
            }

            return output;
        });

        Handlebars.registerHelper('commentTimestamp', dateTime => format(dateTime.value, 'MMM DD, YYYY@HH:mm').toUpperCase());



    }

    render() {
        let data = this.props.data;
        if(data) {
            return (

                <DetailsWindow
                    title="Allergy Detail"
                    width={500}
                    height={480}
                    minSize={{width:500, height:200}}
                    modal={true}
                    ref={e => this._window = e}>

                    <div className="allergyDetails">
                        <pre>
                            {this._toReturnValue()}
                        </pre>
                    </div>

                </DetailsWindow>
            );
        }

        return null;

    }

    static _template() {
        return [
            '    Causative agent: {{causativeAgent}}',
            ' Nature of Reaction: {{natureOfReaction}}',
            ' ',
            '{{#if reactions}}',
            '     Signs/symptoms: {{signsAndSymptoms}}',
            ' ',
            '{{/if}}',
            '{{#if reactantDetails.drugClasses}}',
            '       Drug Classes: {{drugClasses}}',
            ' ',
            '{{/if}}',
            '         Originator: {{toUpperCase enteredBy}}',
            '         Originated: {{originated dateTimeEntered}}',
            '{{#if dateOccurred}}',
            ' Obs dates/severity: {{obsDates}}',
            ' ',
            '{{/if}}',
            '           Verified: <auto-verified>', // hard coded
            'Observed/Historical: {{toTitleCase observedOrHistorical}}',
            '{{#if hasComments}}',
            ' ',
            'Comments:',
            '{{#if comments}}',
            '{{#each comments as |comment|}}',
            '   {{commentTimestamp dateTimeEntered}} by ORIGINATOR',
            '{{comment.comment}}',
            '{{/each}}',
            '{{else}}',
            '{{#if removalDetails}}',
            '   {{commentTimestamp removalDetails.dateTimeEntered}} by ORIGINATOR',
            '{{removalDetails.comment}}',
            '{{/if}}',
            '{{/if}}',
            ' ',
            '{{/if}}',
        ];
    }


    _toReturnValue() {
        return Handlebars.compile(AllergyDetail._template().join('\r\n'))(this.props.data);
    }

    orderFront() {
        if(this._window) {
            this._window.dropIn();

        }
    }

    orderOut() {
        if(this._window) {
            this._window.close();
        }
    }
}

export default AllergyDetail;