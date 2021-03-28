import React, { Component, useState } from 'react';
import './Filter.scss';

export function FilterItems(props: any) {
	let els = [];
	const dtypes = props.dtypes;
	if (dtypes !== null && dtypes !== undefined && dtypes[0] !== undefined) {
        let i = 0;
		for (let dtype of dtypes) {
            let checked = false;
            if (props.dsel !== undefined && props.dsel[0] !== undefined) {
                checked = props.dsel[i];
            }
			els.push(
                <div className='filter-item'>
                    <input type='checkbox' checked={checked} />
                    <span>{dtype.type}</span>
                </div>
            );
            i++;
		}
	}
	return <div>{els}</div>;
}

export function Filter(props: any) {
	return (
		<form className="filter">
			<FilterItems dtypes={props.dtypes} dsel={props.dsel} />
		</form>
	);
}
