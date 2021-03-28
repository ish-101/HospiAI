import react from 'react';
import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from 'react-accessible-accordion';
import { Disease } from '../pages/Precautions';
import './Diagnosis.scss'

export function Diagnosis(props: any) {
	let els = [];
	const diseases: Disease[] = props.diseases;
	if (diseases !== null && diseases !== undefined && diseases[0] !== undefined) {
        let i = 0;
		for (let disease of diseases) {
			let prec_els: any = [];
			if (disease.precautions != null) {
				for (let precaution of disease.precautions) {
					prec_els.push(<div className='pre-item'>{precaution}</div>);
				}
			}
			let likeliness = 'Less';
			if (i == 0) {
				likeliness = 'Most';
			}
			els.push(
				<AccordionItem className='acc-item' uuid={i.toString()}>
					<AccordionItemHeading>
						<AccordionItemButton>
							{disease.type} <div className={`like ${likeliness.toLowerCase()}-like`}>{likeliness} Likely</div>
						</AccordionItemButton>
					</AccordionItemHeading>
					<AccordionItemPanel>
						<div className='desc'>
							<p>{disease.description}</p>
						</div>
                        <div className='pre'>
                            {prec_els}
                        </div>
					</AccordionItemPanel>
				</AccordionItem>
			);
            i++;
		}
        return (
            <div className='dia'>
                <Accordion className='acc' preExpanded={['0']}>{els}</Accordion>
            </div>
        );
	}
	return (
       <></>
    );
}
