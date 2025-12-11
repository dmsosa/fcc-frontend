import type { Option } from "../components/Widgets/Form/CustomSelect";

export type TPriority = 'high' | 'mid' | 'low';

export type TTodo = {
    id: number,
    title: string,
    completed: boolean,
    priority: TPriority
};

export const staticTodoMap: { [id:number] : TTodo} = {
    1: {
  "id": 1,
  "title": "quam sapien varius ut",
  "priority": 'high',
  "completed": false
},
2: {
  "id": 2,
  "title": "nibh ligula nec",
  "priority": 'low',
  "completed": false
},
3: {
  "id": 3,
  "title": "maecenas leo odio condimentum",
  "priority": 'high',
  "completed": false
},
4: {
  "id": 4,
  "title": "et magnis dis",
  "priority": 'mid',
  "completed": false
},
5:  {
  "id": 5,
  "title": "vestibulum eget vulputate",
  "priority": 'high',
  "completed": true
},
6: {
  "id": 6,
  "title": "arcu sed augue aliquam",
  "priority": 'high',
  "completed": true
},
7: {
  "id": 7,
  "title": "sodales scelerisque mauris",
  "priority": 'mid',
  "completed": true
},
8: {
  "id": 8,
  "title": "convallis eget eleifend",
  "priority": 'high',
  "completed": true
},
9: {
  "id": 9,
  "title": "et eros vestibulum ac",
  "priority": 'mid',
  "completed": true
},
10: {
  "id": 10,
  "title": "augue luctus tincidunt",
  "priority": 'high',
  "completed": true
},
11: {
  "id": 11,
  "title": "maecenas tincidunt lacus",
  "priority": 'low',
  "completed": true
},
12: {
  "id": 12,
  "title": "molestie hendrerit at",
  "priority": 'low',
  "completed": false
},
13: {
  "id": 13,
  "title": "non pretium quis",
  "priority": 'mid',
  "completed": false
},
14: {
  "id": 14,
  "title": "iaculis congue vivamus",
  "priority": 'low',
  "completed": false
},
15: {
  "id": 15,
  "title": "vitae mattis nibh",
  "priority": 'low',
  "completed": false
},
16: {
  "id": 16,
  "title": "ut erat curabitur",
  "priority": 'low',
  "completed": false
},
17: {
  "id": 17,
  "title": "morbi non quam",
  "priority": 'mid',
  "completed": true
},
18: {
  "id": 18,
  "title": "rutrum nulla nunc purus",
  "priority": 'mid',
  "completed": false
},
19:{
  "id": 19,
  "title": "est risus auctor sed",
  "priority": 'mid',
  "completed": true
},}

export const staticTodoIds : number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

export const priorityOptions: Option<TPriority>[] =[{value: 'high', label: 'High'}, {value: 'mid', label: 'Mid'}, {value: 'low', label: 'Low'}];
