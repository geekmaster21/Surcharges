import React from "react"

export function useDerivedState<State>(
    onDepChange: () => State,
    depList: any[]
): [State, (newState: State | ((state: State) => State)) => void] {
    const [localState, setLocalState] = React.useState<
        | { init: false }
        | {
            init: true
            publicState: State
            depList: any[]
        }
    >({ init: false })

    let currPublicState: State
    if (
        !localState.init ||
        depList.length !== localState.depList.length ||
        !localState.depList.every((x, i) => depList[i] === x)
    ) {
        currPublicState = onDepChange()
        setLocalState({
            init: true,
            publicState: currPublicState,
            depList
        })
    } else {
        currPublicState = localState.publicState
    }

    const publicSetState = React.useCallback(
        (newState: State | ((state: State) => State)) => {
            setLocalState(localState => {
                if (!localState.init) throw new Error()
                const publicState =
                    typeof newState === 'function'
                        ? (newState as any)(localState.publicState)
                        : newState
                return { ...localState, publicState }
            })
        },
        []
    )
    return [currPublicState, publicSetState]
}
