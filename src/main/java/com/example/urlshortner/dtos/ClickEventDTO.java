package com.example.urlshortner.dtos;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ClickEventDTO {
    private LocalDate clickDate;
    private long count;

    public LocalDate getClickDate() {
        return clickDate;
    }

    public void setClickDate(LocalDate clickDate) {
        this.clickDate = clickDate;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }
}

