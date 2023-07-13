import { Button, ButtonProps, Tooltip, createPolymorphicComponent } from "@mantine/core";
import React from "react";

export type RematchButtonProps = {
    status: "none" | "waitingForOtherPlayer" | "otherPlayerWantsRematch";
} & ButtonProps;

export const _RematchButton: React.FC<RematchButtonProps> = ({ status, children, ...props }) => {
    const tooltipLabel: Record<RematchButtonProps["status"], string> = {
        none: "",
        otherPlayerWantsRematch: "Other player wants a rematch!",
        waitingForOtherPlayer: "Waiting for other player to accept rematch",
    };

    return (
        <Tooltip
            label={tooltipLabel[status]}
            disabled={status === "none"}
            opened={status !== "none"}
            color="gray"
            position="bottom"
            withArrow
        >
            <Button
                {...props}
                color={status === "otherPlayerWantsRematch" ? "pink" : "green"}
                loading={status === "waitingForOtherPlayer"}
            >
                {children}
            </Button>
        </Tooltip>
    );
};
export const RematchButton = createPolymorphicComponent<"button", RematchButtonProps>(
    _RematchButton,
);
