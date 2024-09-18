import { ColumnDefinition, Person } from './data';

export let columns: Array<ColumnDefinition<Person>> = [{
    id: 'firstName',
    path: 'firstName',
    label: 'First name',
    fixed: true
}, {
    id: 'lastName',
    path: 'lastName',
    label: 'Last name',
    fixed: true
}, {
    id: 'profession',
    path: 'profession',
    label: 'Profession',
    fixed: true,
    filter: {
        mode: 'select'
    }
}, {
    id: 'status',
    path: 'status',
    label: 'Status',
    fixed: true,
    filter: {
        mode: 'select'
    }
}, {
    id: 'membership',
    path: 'membership',
    label: 'Membership',
    fixed: true,
    filter: {
        mode: 'select'
    }
}];
