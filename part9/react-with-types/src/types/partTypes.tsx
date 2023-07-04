interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group";
}

interface CoursePartBaseWithDescription extends CoursePartBase {
    description: string;
}

interface CoursePartBasic extends CoursePartBaseWithDescription {
    kind: "basic";
}

interface CoursePartBackground extends CoursePartBaseWithDescription {
    backgroundMaterial: string;
    kind: "background";
}

interface CoursePartWithRequirements extends CoursePartBaseWithDescription {
    requirements: string[];
    kind: "special";
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartWithRequirements;
