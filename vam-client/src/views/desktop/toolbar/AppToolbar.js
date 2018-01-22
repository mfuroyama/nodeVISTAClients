import React from 'react';

import ToolbarView from '~/react-views/ToolbarView';
import ButtonView from '~/react-views/ButtonView';
import MenuView from '~/react-views/MenuView';
import MenuItemView from '~/react-views/MenuItemView';
import MenuButtonView from '~/react-views/MenuButtonView';
import MenuItemSeparator from '~/react-views/MenuItemSeparator';

class AppToolbar extends React.Component {

    render() {

        let target = this.props.target;

        return (

            <ToolbarView>
                <MenuButtonView text="Actions" icon="fa fa-bars">
                    <MenuView>
                        <MenuItemView action={target.showPatientSelectWindow.bind(target)}
                            icon="fa fa-user" text="Select New Patient"/>
                        <MenuItemView icon="fa fa-refresh" text="Refresh Patient Information"/>
                        <MenuItemView icon="fa fa-user-md" text="Update Provider/Location"/>
                        <MenuItemView icon="fa fa-pencil" text="Review/Sign Changes"/>
                        <MenuItemSeparator />
                        <MenuItemView icon="fa fa-plus" text="Add">
                            <MenuView>
                                <MenuItemView text="Active Problems" action={target.addActiveProblems.bind(target)}/>
                                <MenuItemView text="Allergies" action={target.addAllergies.bind(target)}/>
                                <MenuItemView text="Vitals" action={target.addVitals.bind(target)}/>
                            </MenuView>
                        </MenuItemView>
                    </MenuView>
                </MenuButtonView>

                <ButtonView icon="fa fa-sign-out" text="Logout" section="right" />

            </ToolbarView>

        )

    }

}


export default AppToolbar;