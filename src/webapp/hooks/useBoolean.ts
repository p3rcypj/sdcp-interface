import React from "react";

type Callback = () => void;

type UseBooleanReturn = [boolean, UseBooleanActions];

interface UseBooleanActions {
    set: (newValue: boolean) => void;
    toggle: Callback;
    enable: Callback;
    disable: Callback;
    show: Callback;
    hide: Callback;
}

export function useBooleanState(initialValue: boolean): UseBooleanReturn {
    const [value, setValue] = React.useState(initialValue);

    const actions = React.useMemo(() => {
        return {
            set: (newValue: boolean) => setValue(newValue),
            enable: () => setValue(true),
            disable: () => setValue(false),
            show: () => setValue(true),
            hide: () => setValue(false),
            toggle: () => setValue(value_ => !value_),
        };
    }, [setValue]);

    return [value, actions];
}
