import * as React from "react";

type Value = any;

type ContextWithSetter = React.Context<{
    value: Value;
    setValue: (value: Value) => void;
}>;

const {Provider, Consumer}: ContextWithSetter = React.createContext({
    value: false,
    setValue: (value: Value) => {}
});

interface State {
    value: Value;
    setValue: (value: Value) => void;
}

interface Props {
    defaultValue: Value;
}

class ProviderWithSetter extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.state = {
            value: props.defaultValue,
            setValue: this.setValue
        };
    }

    public render() {
        return <Provider value={this.state}>{this.props.children}</Provider>;
    }

    private setValue = (value: Value) => this.setState({value});
}

export {ProviderWithSetter as Provider, Consumer};
